package doorgo.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
