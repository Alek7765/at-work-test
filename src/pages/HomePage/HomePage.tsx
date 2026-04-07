import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../api/userApi';
import { useUserStore } from '../../store/useUserStore';
import { UserCard } from '../../components/UserCard/UserCard';
import { Loader } from '../../components/Loader/Loader';
import { Header } from '../../components/Header/Header';
import styles from './HomePage.module.scss';
import { User } from '../../types/user';

export const HomePage = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { archivedIds, hiddenIds, updatedUsers, archiveUser, restoreUser, hideUser } = useUserStore();

  if (isLoading) {
    return (
      <div className={styles.layout}>
        <Header />
        <main className="container"><Loader /></main>
      </div>
    );
  }

  if (error || !users) {
    return (
      <div className={styles.layout}>
        <Header />
        <main className="container">
          <div className={styles.error}>Ошибка при загрузке данных пользователей.</div>
        </main>
      </div>
    );
  }

  // Обновляем данные пользователей из локального store
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
  const archivedUsersList = visibleUsers.filter(u => archivedIds.includes(u.id));

  return (
    <div className={styles.layout}>
      <Header />
      
      <main className={`container ${styles.main}`}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Активные</h2>
          <div className={styles.grid}>
            {activeUsers.length === 0 ? (
              <p className={styles.empty}>Нет активных пользователей</p>
            ) : (
              activeUsers.map(user => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  onArchive={archiveUser}
                  onHide={hideUser}
                />
              ))
            )}
          </div>
        </section>

        {archivedUsersList.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Архив</h2>
            <div className={styles.grid}>
              {archivedUsersList.map(user => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  isArchived={true}
                  onRestore={restoreUser}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
