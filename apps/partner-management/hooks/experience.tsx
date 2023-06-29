import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { Flex } from '@collinsonx/design-system/core';
import { Experience, Partner } from '@collinsonx/utils';
import { useQuery } from '@collinsonx/utils/apollo';
import getPartnerByID from '@collinsonx/utils/queries/getPartnerByID';
import { SELECTED_LOUNGE } from 'config';
import React, { PropsWithChildren, useState } from 'react';
import { createContext, useContext } from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

import suExperiences from '../data/experiences.json';

import ErrorComponent from '@components/Error';
import { getItem, setItem } from '@collinsonx/utils/lib';

type ExperienceState = {
  experience: Experience;
  setExperience(experience: Experience): void;
};

const ExperienceContext = createContext<ExperienceState | null>(null);

export const useExperience = (): ExperienceState => {
  const context = useContext(ExperienceContext);

  if (!context) {
    throw new Error('Please use ExperienceProvider in parent component');
  }

  return context;
};

export const ExperienceProvider = (props: PropsWithChildren) => {
  const session: any = useSessionContext();

  const [experience, setExperience] = useState<Experience>(
    suExperiences[0] as Experience
  );

  const { loading, error, data } = useQuery<{
    getPartnerByID: Partner;
  }>(getPartnerByID, {
    variables: { getPartnerById: session.userId },
    skip: !session.userId,
    onCompleted: (data) => {
      if (getItem(SELECTED_LOUNGE)) {
        setExperience(JSON.parse(getItem(SELECTED_LOUNGE)!));
      } else if (data?.getPartnerByID) {
        const { experiences } = data.getPartnerByID;
        if (
          experiences.length &&
          session.accessTokenPayload.userType === 'PARTNER'
        ) {
          setItem(SELECTED_LOUNGE, JSON.stringify(experiences[0]));
          setExperience(experiences[0]);
        }
      } else if (session.accessTokenPayload.userType === 'SUPER_USER') {
        setItem(SELECTED_LOUNGE, JSON.stringify(suExperiences[0]));
        setExperience(suExperiences[0] as Experience);
      }
    },
  });

  return (
    <ExperienceContext.Provider value={{ experience, setExperience }}>
      {loading ? (
        <Flex
          justify="center"
          align="center"
          h="100%"
          w="100%"
          style={{ position: 'absolute', top: 0, bottom: 0 }}
        >
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <>
          <ErrorComponent error={error} />
          {props.children}
        </>
      )}
    </ExperienceContext.Provider>
  );
};

export default useExperience;
