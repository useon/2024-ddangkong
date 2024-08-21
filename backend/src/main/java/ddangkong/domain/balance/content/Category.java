package ddangkong.domain.balance.content;

import java.util.Arrays;
import java.util.List;
import lombok.Getter;

@Getter
public enum Category {
    ROMANCE("연애"),
    IF("만약에"),
    MBTI("MBTI"),
    FOOD("음식"),
    ;

    private static final List<Category> CATEGORIES = Arrays.stream(Category.values()).toList();
    private final String name;

    Category(String name) {
        this.name = name;
    }

    public static List<Category> getCategories() {
        return CATEGORIES;
    }
}
