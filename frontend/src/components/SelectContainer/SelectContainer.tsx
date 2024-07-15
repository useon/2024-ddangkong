import { layout, selectSection } from './SelectCotainer.styled';

import Button from '@/components/common/Button/Button';
import SelectOption from '@/components/SelectOption/SelectOption';

const SelectContainer = () => {
  return (
    <div css={layout}>
      <section css={selectSection}>
        <SelectOption />
        <span>VS</span>
        <SelectOption />
      </section>
      <Button />
    </div>
  );
};

export default SelectContainer;
