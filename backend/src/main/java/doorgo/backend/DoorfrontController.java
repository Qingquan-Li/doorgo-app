package doorgo.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Objects;

@RestController
public class DoorfrontController {
    @Autowired
    private DoorfrontRepository doorfrontRepository;

    @PostMapping("/doorfronts")
    public void addDoorfront(@RequestBody final List<Doorfront> doorfronts) {
         doorfrontRepository.saveAll(doorfronts);
    }

    @GetMapping("/doorfronts")
    public List<Doorfront> findDoorfronts() {
         return doorfrontRepository.findAll();
    }

    @GetMapping("doorfronts/{doorfrontId}")
    public Doorfront findDoorfront(@PathVariable final String doorfrontId) {
         return doorfrontRepository.findById(doorfrontId).orElseGet(Doorfront::new);
    }

    @PatchMapping("doorfronts/{doorfrontId}")
    public void partialUpdateDoorfront(@PathVariable final String doorfrontId,
                                       @RequestBody final Doorfront doorfront) throws Exception {
        for (final Field field : Doorfront.class.getDeclaredFields()) {
            final String fieldName = field.getName();

            if (fieldName.equals("id")) {
                continue;
            }

            final Method getter = Doorfront.class.getDeclaredMethod("get" + StringUtils.capitalize(fieldName));
            final Object fieldValue = getter.invoke(doorfront);

            if (Objects.nonNull(fieldValue)) {
                doorfrontRepository.partialUpdate(doorfrontId, fieldName, fieldValue);
            }
        }
    }
}
