import { useEffect, useState } from "react";
import { doesSessionExist, useSessionContext, getUserId } from "supertokens-auth-react/recipe/session";
import ThirdPartyPasswordless from "supertokens-auth-react/recipe/thirdpartypasswordless";
import { useRouter } from 'next/router';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [userId, setUserId] = useState<String | null>(null);
    const router = useRouter();
    
    useEffect(() => {
        init();
    }, [])

    const logout =  () => {
        return ThirdPartyPasswordless.signOut();
    }

    async function init() {
        const userId = await getUserId();
        const sessionState = await doesSessionExist();
        setUserId(userId);
        setIsLoggedIn(sessionState);

        if (!sessionState) {
            router.push({
                pathname: '/',
              });
        }
    }

    
    return [isLoggedIn, userId, logout]
}

export default useAuth;