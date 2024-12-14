import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import {
  Badge,
  Button,
  Dialog, DialogClose,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/index.js";
import { EditIcon, EyeIcon, Fingerprint } from "lucide-react";
import { InputText, InputTextarea } from "@/components/atom/input.jsx";
import { useForm } from "react-hook-form";
import { useAccount } from "@/hooks/use-account.js";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { extractServerErrors, useFetchQuery, useMutation } from "@/hooks/use-queries.js";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Link } from "react-router";
import { LoadingBlock } from "@/components/molecule/loading-block.jsx";
import QRCode from "react-qr-code";

export const ProfilePage = () => {
  const {account} = useAccount();
  return <>
    <div className="container mx-auto mt-10 flex">
      <div className="flex flex-col gap-4 items-center justify-center flex-1">
        <Avatar className="w-32 h-32">
          <AvatarImage src={account.name} alt={account.name}/>
          <AvatarFallback>{account.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 text-center">
          <div className="">{account.email}</div>
          <div className="">{account.name}</div>
          <div className="">{account.bio}</div>
        </div>
        <div className="space-x-4">
          <UpdateProfile/>
          <MFA />
        </div>
      </div>
    </div>
    <div className="my-10 mx-auto container">
      <h1 className="text-3xl">My recipes</h1>
      <Recipes/>
    </div>
  </>;
};

const Recipes = () => {
  const {data, isLoading} = useFetchQuery("/account/recipes");

  if (isLoading) return <LoadingBlock/>;


  return (<div className="border rounded-lg mt-5">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Published</TableHead>
          <TableHead className="text-end">See more</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((recipe) => (
          <TableRow key={recipe.id}>
            <TableCell>{recipe.name}</TableCell>
            <TableCell>{recipe.description}</TableCell>
            <TableCell>{recipe.duration}</TableCell>
            <TableCell>{recipe.published ? <Badge>yes</Badge> : <Badge variant="destructive">no</Badge>}</TableCell>
            <TableCell className="text-end">
              <Link to={`/recipes/${recipe.id}`}><Button variant="outline" size="icon"><EyeIcon
                className="w-6 h-6"/></Button></Link>
            </TableCell>
          </TableRow>))
        }
      </TableBody>
    </Table>
  </div>);
};

const UpdateProfile = () => {
  const [open, setOpen] = useState(false);
  const {register, setError, formState: {errors}, handleSubmit} = useForm();
  const {account} = useAccount();
  const {mutate, isPending} = useMutation("/account", {}, "put");

  const handleEdit = (values) => {
    mutate(values, {
      onSuccess: () => {
        window.location.reload();
        toast.success("Profile updated !");
        setOpen(false);
      },
      onError: (error) => extractServerErrors(setError, error)
    });
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <EditIcon className="w-4 h-4 mr-2"/>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update profile</DialogTitle>
          <DialogDescription>
            Update your profile here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEdit)} className="grid gap-2">
          <InputText
            disabled={isPending}
            required
            error={errors.name?.message}
            label="Name"
            {...register("name")}
            defaultValue={account.name}
          />
          <InputTextarea
            disabled={isPending}
            required
            error={errors.bio?.message}
            label="Bio"
            {...register("bio")}
            defaultValue={account.bio}
          />
          <Button disabled={isPending} type="submit" className="w-full">
            Save
          </Button>
        </form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button className="w-full" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};

const MFA = () => {
  const [open, setOpen] = useState(false);
  const [scan, setScan] = useState();
  const {handleSubmit } = useForm();
  const {account} = useAccount();
  const {mutate, isPending} = useMutation("/account/mfa", {}, "post");

  const handleEdit = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        toast.success("2FA Enabled, scan the QR code to complete !");
        setScan(data.url);
      }
    });
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {!account.mfaEnabled && <Button variant="outline">
          <Fingerprint className="w-4 h-4 mr-2"/>
          Enable 2FA
        </Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{scan ? "Scan this Qr code bellow" : "Enable 2FA"}</DialogTitle>
          <DialogDescription>
            Ready to enable 2FA to your account.
          </DialogDescription>
        </DialogHeader>

        {scan && <div className="w-100 h-100 flex justify-center items-center">
          <QRCode value={scan}/>
        </div>}
        {!scan && <form onSubmit={handleSubmit(handleEdit)} className="grid gap-2">
          <Button disabled={isPending} type="submit" className="w-full">
            Enabled
          </Button>
        </form>}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button className="w-full" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
};