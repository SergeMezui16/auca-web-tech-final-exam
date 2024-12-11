import { forwardRef } from "react";
import { CircleXIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const InputText = forwardRef(({...rest}, ref) => {
  return <BaseInput ref={ref} type="text" {...rest} />;
});
InputText.displayName = "InputText";

export const InputTextarea = forwardRef(({label, error, description, ...rest}, ref) => {
  return (
    <InputBoxDiv disabled={rest.disabled}>
      <InputLabel label={label} required={rest.required} id={rest.id ? rest.id : rest.name}/>
      <Textarea ref={ref} className={cn(error && "border-destructive", rest.className)} {...rest} />
      <InputDescriptionOrError error={error} desc={description}/>
    </InputBoxDiv>
  );
});
InputTextarea.displayName = "InputTextarea";

export const InputNumber = forwardRef(({...rest}, ref) => {
  return <BaseInput type="number" {...rest} ref={ref}/>;
});
InputNumber.displayName = "InputNumber";

export const InputFile = forwardRef(({...rest}, ref) => {
  return <BaseInput ref={ref} type="file" {...rest} />;
});
InputFile.displayName = "InputFile";

const BaseInput = forwardRef(({description, label, error, className, ...rest}, ref) => {
  return (
    <InputBoxDiv
      title={description}
      className={cn("items-center", rest.disabled && "opacity-50")}
    >
      <InputLabel required={rest.required} label={label} id={rest.id ? rest.id : rest.name}/>
      <Input ref={ref} className={cn(error && "border-destructive", className)} {...rest}
             id={rest.id ? rest.id : rest.name}/>
      <InputDescriptionOrError error={error} desc={description}/>
    </InputBoxDiv>
  );
});
BaseInput.displayName = "BaseInput";

const InputDescriptionOrError = ({error, desc}) => {
  if (error) return (
    <div className="flex text-xs items-center ml-1 text-destructive gap-1 font-bold">
      <CircleXIcon className="w-3 h-3"/>
      <span className="text-xs">{error}</span>
    </div>
  );

  if (desc) return <span className="ml-1 text-muted-foreground text-xs">{desc}</span>;

  return null;
};

const InputBoxDiv = ({className, ...rest}) => {
  return <div
    className={cn("grid w-full max-w-sm my-2 gap-1.5 rounded", rest.disabled && "opacity-50 cursor-not-allowed", className)}
    {...rest}
  />;
};

const InputLabel = ({id, label, required}) => {
  return (<Label className="ml-1" htmlFor={id}>
    {label} {required && <span className="text-destructive">*</span>}
  </Label>);
};