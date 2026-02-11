'use client';
import { useUser, useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';

export function useAdmin() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const adminRoleRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'roles_admin', user.uid);
    }, [firestore, user]);

    const { data: adminDoc, isLoading: isAdminLoading } = useDoc(adminRoleRef);

    const isLoading = isUserLoading || (!!user && isAdminLoading);

    return {
        isAdmin: !!adminDoc,
        isAdminLoading: isLoading,
    };
}
