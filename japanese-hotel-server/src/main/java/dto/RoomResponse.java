package dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponse {
    private Long roomId;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked = false;
    // Base64
    private String roomPhoto;
    private List<BookingResponse> bookingResponses;

    public RoomResponse(Long roomId, String roomType, BigDecimal roomPrice) {
        this.roomId = roomId;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }

    public RoomResponse(Long roomId, String roomType, BigDecimal roomPrice, boolean isBooked,
                        byte[] photoByte, List<BookingResponse> bookingResponseList) {
        this.roomId = roomId;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        // byte[] -> String
        this.roomPhoto = photoByte != null ? Base64.encodeBase64String(photoByte) : null;
        this.bookingResponses = bookingResponseList;
    }
}
