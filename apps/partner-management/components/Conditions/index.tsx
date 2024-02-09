import { Conditions as IConditions, Maybe } from '@collinsonx/utils';
import { DescriptionList } from '@collinsonx/design-system';
import EditableArea from '@components/EditableArea';

const { Term, Description, Group } = DescriptionList;

interface ConditionsProps {
  conditions?: Maybe<IConditions>;
}

const Conditions = ({ conditions }: ConditionsProps) => {
  return (
    <EditableArea
      title="Conditions"
      subtitle="Last edited:"
      data-testid="outlet-conditions"
    >
      <DescriptionList>
        <Group fw>
          <Term>Conditions description</Term>
          <Description>{conditions?.legacyConditions}</Description>
        </Group>
      </DescriptionList>
    </EditableArea>
  );
};

export default Conditions;
