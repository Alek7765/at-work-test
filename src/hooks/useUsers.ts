import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '@/api/userApi'
import { useUserStore } from '@/store/useUserStore'
import { User } from '@/types/user'

export const useUsers = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const {
    archivedIds,
    hiddenIds,
    updatedUsers,
    archiveUser,
    restoreUser,
    hideUser
  } = useUserStore()

  if (isLoading || error || !users) {
    return {
      isLoading,
      error,
      activeUsers: [],
      archivedUsers: [],
      archiveUser,
      restoreUser,
      hideUser,
    }
  }

  const mergedUsers: User[] = users.map(u => {
    const override = updatedUsers[u.id];
    if (override) {
      return {
        ...u,
        name: override.name,
        username: override.username,
        email: override.email,
        phone: override.phone,
        address: { ...u.address, city: override.city },
        company: { ...u.company, name: override.companyName }
      };
    }
    return u;
  });

  const visibleUsers = mergedUsers.filter(u => !hiddenIds.includes(u.id));
  const activeUsers = visibleUsers.filter(u => !archivedIds.includes(u.id));
  const archivedUsers = visibleUsers.filter(u => archivedIds.includes(u.id));

  return {
    isLoading: false,
    error: null,
    activeUsers,
    archivedUsers,
    archiveUser,
    restoreUser,
    hideUser,
  }
}