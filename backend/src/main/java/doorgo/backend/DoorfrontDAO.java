package doorgo.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DoorfrontDAO {
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Doorfront> findAll() {
        return mongoTemplate.findAll(Doorfront.class);
    }

    public void saveAll(final List<Doorfront> doorfronts) {
        mongoTemplate.insertAll(doorfronts);
    }

    public Doorfront findById(final String doorfrontId) {
        return mongoTemplate.findById(doorfrontId, Doorfront.class);
    }
}