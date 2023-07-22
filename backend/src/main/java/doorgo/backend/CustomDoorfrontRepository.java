package doorgo.backend;

public interface CustomDoorfrontRepository {
    void partialUpdate(final String doorfrontId, String fieldName, final Object fieldValue);
}
