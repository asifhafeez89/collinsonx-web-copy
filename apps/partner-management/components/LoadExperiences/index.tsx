import InputSelect from '@collinsonx/design-system/components/inputselect/index';
import { Experience } from '@collinsonx/utils';
import { useQuery } from '@collinsonx/utils/apollo';
import { setItem } from '@collinsonx/utils/lib/index';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import { SELECTED_LOUNGE } from 'config';

export interface LoadExperiencesProps {
  selectedExperience?: Experience;
  onExperienceSelected: (experience: Experience) => void;
}

const LoadExperiences = ({
  selectedExperience,
  onExperienceSelected,
}: LoadExperiencesProps) => {
  const { loading, error, data, refetch } = useQuery<{
    searchExperiences: Experience[];
  }>(getSearchExperiences);

  const experiencesFiltered = data?.searchExperiences.map(
    (experience: Experience) => {
      return {
        value: experience.id,
        label: `${experience.loungeName}${
          experience.location?.terminal
            ? ' - ' + experience.location?.terminal
            : ''
        }`,
      };
    }
  );

  return (
    <div>
      {data?.searchExperiences && (
        <InputSelect
          styles={{
            root: {
              width: '400px',
            },
          }}
          data={experiencesFiltered ?? []}
          onChange={async (id: string) => {
            const newExperience = data?.searchExperiences.filter(
              (item: Experience) => item.id === id
            )[0]! as Experience;

            onExperienceSelected(newExperience);

            setItem(SELECTED_LOUNGE, JSON.stringify(newExperience));
          }}
          value={selectedExperience?.id}
        />
      )}
    </div>
  );
};

export default LoadExperiences;
