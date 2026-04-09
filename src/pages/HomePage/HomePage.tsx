import { Loader } from '@/components/Loader/Loader'
import UserCard from '@/components/UserCard/UserCard'
import Section from "@/layouts/Section/Section"
import { useUsers } from '@/hooks/useUsers'

export default () => {
  const {
    isLoading,
    error,
    activeUsers,
    archivedUsers,
    archiveUser,
    restoreUser,
    hideUser,
  } = useUsers()

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="error container">Ошибка при загрузке данных пользователей.</div>
    )
  }

  return (
    <>
      <Section
        title="Активные"
        titleId="active-users-title"
        isEmpty={activeUsers.length === 0}
      >
        {activeUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onArchive={archiveUser}
            onHide={hideUser}
          />
        ))}
      </Section>

      {archivedUsers.length > 0 && (
        <Section
          title="Архив"
          titleId="archived-users-title"
          isEmpty={false}
        >
          {archivedUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              isArchived={true}
              onRestore={restoreUser}
            />
          ))}
        </Section>
      )}
    </>
  )
}