package auca.recipe.service;

import auca.recipe.entity.File;
import auca.recipe.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class FileService {

    FileRepository repository;

    public FileService(@Autowired FileRepository repository) {
        this.repository = repository;
    }


    public File store(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        File fileDB = new File(fileName, file.getContentType(), file.getBytes());

        return repository.save(fileDB);
    }

    public Optional<File> getFile(Long id) {
        return repository.findById(id);
    }

    public Stream<File> getAllFiles() {
        return repository.findAll().stream();
    }
}
