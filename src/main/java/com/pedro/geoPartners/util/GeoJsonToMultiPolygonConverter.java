import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import org.geojson.GeoJsonObject;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.MultiPolygon;


@Converter(autoApply = true)
public class GeoJsonToMultiPolygonConverter implements AttributeConverter<MultiPolygon,GeoJsonObject> {

    private GeometryFactory geometryFactory = new GeometryFactory();

    @Override
    public GeoJsonObject convertToDatabaseColumn(MultiPolygon multiPolygon) {
       
        return null;
       
    }

    @Override
    public MultiPolygon convertToEntityAttribute(GeoJsonObject geoJsonObject) {
        
        return null;
        
    }

}
