package doorgo.backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Doorfront {
    @Id
    private String id;
    @Field("photoUrl")
    private String photo;
    private String latitude;
    private String longitude;
//    private String doorType;
//    private String doorHandleType;
//    private boolean hasStairs;
//    private boolean hasRamps;
//    private String notes;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

//    public String getDoorType() {
//        return doorType;
//    }
//
//    public void setDoorType(String doorType) {
//        this.doorType = doorType;
//    }
//
//    public String getDoorHandleType() {
//        return doorHandleType;
//    }
//
//    public void setDoorHandleType(String doorHandleType) {
//        this.doorHandleType = doorHandleType;
//    }
//
//    public boolean isHasStairs() {
//        return hasStairs;
//    }
//
//    public void setHasStairs(boolean hasStairs) {
//        this.hasStairs = hasStairs;
//    }
//
//    public boolean isHasRamps() {
//        return hasRamps;
//    }
//
//    public void setHasRamps(boolean hasRamps) {
//        this.hasRamps = hasRamps;
//    }
//
//    public String getNotes() {
//        return notes;
//    }
//
//    public void setNotes(String notes) {
//        this.notes = notes;
//    }
}
