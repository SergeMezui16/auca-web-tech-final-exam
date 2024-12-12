package auca.recipe.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;

import java.util.Map;
import java.util.Optional;

/**
 * Abstract base class for API controllers providing common methods
 * to handle HTTP requests and responses.
 */
public abstract class AbstractApiController {

    /**
     * Sends an HTTP OK response with the specified body.
     *
     * @param body the body of the response, which may be null
     * @return a ResponseEntity containing the response body with HTTP status OK
     */
    protected <T> ResponseEntity<T> send(@Nullable T body) {
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    /**
     * Sends an HTTP OK response with the given body, if present, or a NOT FOUND response if the body is empty.
     *
     * @param body an Optional containing the body of the response. If the Optional is empty, a NOT FOUND response
     *             will be returned.
     * @return a ResponseEntity containing the response body with HTTP status OK if the body is present, or with
     *         HTTP status NOT FOUND if the body is empty.
     */
    protected <T> ResponseEntity<T> send(Optional<T> body) {
        return body.map(t -> new ResponseEntity<>(t, HttpStatus.OK)).orElseGet(this::sendNotFound);
    }

    protected <T> ResponseEntity<T> sendNotFound() {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    protected ResponseEntity<Map<String, Object>> throwUnprocessableEntity(Map<String, Object> errors) {
        return ResponseEntity.unprocessableEntity().body(errors);
    }

    protected <T> ResponseEntity<T> sendBadRequest() {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    protected <T> ResponseEntity<T> sendAttachment(String fileName, String fileType, T data) {
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, fileType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(data);
    }
}
