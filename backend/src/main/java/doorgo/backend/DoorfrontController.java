package doorgo.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class DoorfrontController {
    @Autowired
    private DoorfrontRepository doorfrontRepository;

    @PostMapping("/doorfronts")
    public Doorfront addDoorfront(@RequestBody final Doorfront doorfront) {
         return doorfrontRepository.save(doorfront);
    }

    @GetMapping("/doorfronts")
    public List<Doorfront> findDoorfronts() {
         return doorfrontRepository.findAll();
    }

    @GetMapping("/doorfronts/{doorfrontId}")
    public Doorfront findDoorfront(@PathVariable final String doorfrontId) {
         return doorfrontRepository.findById(doorfrontId).orElseGet(Doorfront::new);
    }

    @PatchMapping("/doorfronts/{doorfrontId}")
    public void partialUpdateDoorfront(@PathVariable final String doorfrontId,
                                       @RequestBody final Doorfront doorfront) throws Exception {
        for (final Field field : Doorfront.class.getDeclaredFields()) {
            final String fieldName = field.getName();

            if (fieldName.equals("id")) {
                continue;
            }

            // final Method getter = Doorfront.class.getDeclaredMethod("get" + StringUtils.capitalize(fieldName));
            final String getterName;
            if (field.getType().equals(boolean.class)) {
                // Examples: isHasStairs, isHasRamps getter methods
                getterName = "is" + StringUtils.capitalize(fieldName);
            } else {
                getterName = "get" + StringUtils.capitalize(fieldName);
            }
            final Method getter = Doorfront.class.getDeclaredMethod(getterName);

            final Object fieldValue = getter.invoke(doorfront);

            if (Objects.nonNull(fieldValue)) {
                doorfrontRepository.partialUpdate(doorfrontId, fieldName, fieldValue);
            }
        }
    }
}
