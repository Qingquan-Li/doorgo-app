package doorgo.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.BasicUpdate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

@Repository
public class CustomDoorfrontRepositoryImpl implements CustomDoorfrontRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void partialUpdate(String doorfrontId,String fieldName, Object fieldValue) {
        mongoTemplate.findAndModify(BasicQuery.query(Criteria.where("id").is(doorfrontId)),
                BasicUpdate.update(fieldName, fieldValue), FindAndModifyOptions.none(), Doorfront.class);
    }
}
