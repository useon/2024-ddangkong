package ddangkong.domain.balance.content;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomContentRepository extends JpaRepository<RoomContent, Long> {

    Optional<RoomContent> findByRoomAndRound(Room room, int round);
}
