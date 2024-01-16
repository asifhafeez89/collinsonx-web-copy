import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { Flex } from '@collinsonx/design-system/core';
import {
  Experience,
  InvitationUserType,
  Partner as PartnerData,
} from '@collinsonx/utils';
import { useQuery } from '@collinsonx/utils/apollo';
import getPartnerByID from '@collinsonx/utils/queries/getPartnerByID';
import { SELECTED_LOUNGE } from 'config';
import React, { PropsWithChildren, useState } from 'react';
import { createContext, useContext } from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

import suExperiences from '../data/experiences.json';

import ErrorComponent from '@components/Error';
import { getItem, setItem } from '@collinsonx/utils/lib';
import Spinner from '@components/Spinner';

type UserDetails = Pick<
  PartnerData,
  'emailAddress' | 'fullName' | 'firstName' | 'lastName' | 'fullName' | 'id'
> | null;

type ExperienceState = {
  experience: Experience;
  userDetails: UserDetails;
  client: string | null;
  setExperience(experience: Experience): void;
};

const ExperienceContext = createContext<ExperienceState | null>(null);

const { SuperUser, Partner: Partner } = InvitationUserType;

export const useExperience = (): ExperienceState => {
  const context = useContext(ExperienceContext);

  if (!context) {
    throw new Error('Please use ExperienceProvider in parent component');
  }

  return context;
};

export const ExperienceProvider = (props: PropsWithChildren) => {
  const session: any = useSessionContext();

  const [userDetails, setUserDetails] = useState<UserDetails>(null);
  const [client, setClient] = useState<string | null>(null);

  const [experience, setExperience] = useState<Experience>(
    suExperiences[0] as Experience
  );

  const { loading, error, data } = useQuery<{
    getPartnerByID: PartnerData;
  }>(getPartnerByID, {
    variables: { getPartnerById: session.userId },
    skip: !session.userId,
    onCompleted: (data) => {
      if (data && data?.getPartnerByID) {
        const { getPartnerByID } = data;
        const { fullName, firstName, lastName, emailAddress, id } =
          getPartnerByID;
        setUserDetails({ fullName, firstName, lastName, emailAddress, id });
      }

      if (
        getItem(SELECTED_LOUNGE) &&
        session.accessTokenPayload.userType === SuperUser
      ) {
        setClient('collinson');
        setExperience(JSON.parse(getItem(SELECTED_LOUNGE)!));
      } else if (data?.getPartnerByID) {
        const { experiences } = data.getPartnerByID;

        if (
          experiences.length &&
          (session.accessTokenPayload.userType === Partner ||
            !session.accessTokenPayload.userType)
        ) {
          setClient(experiences[0].loungeName ?? null);
          setItem(SELECTED_LOUNGE, JSON.stringify(experiences[0]));
          setExperience(experiences[0]);
        }
      } else if (session.accessTokenPayload.userType === SuperUser) {
        setClient('collinson');
        setItem(SELECTED_LOUNGE, JSON.stringify(suExperiences[0]));
        setExperience(suExperiences[0] as Experience);
      }
    },
  });

  return (
    <ExperienceContext.Provider
      value={{ experience, setExperience, userDetails, client }}
    >
      {loading || session.loading ? (
        <Spinner />
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
