import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import { fetchUsers } from '../../api/userApi';
import { useUserStore } from '../../store/useUserStore';
import { User, UserFormData } from '../../types/user';
import { FormInput } from '../../components/FormInput/FormInput';
import { Header } from '../../components/Header/Header';
import { Loader } from '../../components/Loader/Loader';
import { Popup } from '../../components/Popup/Popup';
import styles from './EditPage.module.scss';

const phoneRegex = /^\d+$/;

const formSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа').max(64, 'Не более 64 символов'),
  username: z.string().min(2, 'Минимум 2 символа').max(64, 'Не более 64 символов'),
  email: z.string().email('Некорректный email'),
  city: z.string().min(2, 'Минимум 2 символа').max(64, 'Не более 64 символов'),
  phone: z.string().regex(phoneRegex, 'Только цифры').min(1, 'Обязательное поле'),
  companyName: z.string().min(2, 'Минимум 2 символа').max(64, 'Не более 64 символов'),
});

export const EditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(id);
  const [showPopup, setShowPopup] = useState(false);

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { updatedUsers, updateUser } = useUserStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty }
  } = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });

  const [userAvatar, setUserAvatar] = useState<string>('');

  useEffect(() => {
    if (users && userId) {
      const u = users.find(u => u.id === userId);
      if (u) {
        // Очищаем телефон от нецифровых символов при инициализации (по ТЗ "выводить в том же виде... ввод только цифр")
        // Если сказано "выводить в том же виде, в котором приходит с api", то мы должны вывести '1-770-736-8031 x56442' и упасть на валидации "Только цифры", если попытаемся сохранить? 
        // По ТЗ: "Phone (выводить в том же виде, в котором приходит с api)"
        // А далее "Телефон - ввод только цифр". Это противоречие, но мы выводим как есть, а при вводе разрешаем только цифры, либо заставляем юзера стереть и написать заново цифры.
        
        const override = updatedUsers[userId];
        
        const initialData = {
          name: override?.name || u.name,
          username: override?.username || u.username,
          email: override?.email || u.email,
          city: override?.city || u.address.city,
          phone: override?.phone || u.phone,
          companyName: override?.companyName || u.company.name,
        };
        
        reset(initialData);
        setUserAvatar(u.avatar || '');
      }
    }
  }, [users, userId, updatedUsers, reset]);

  const onSubmit = (data: UserFormData) => {
    updateUser(userId, data);
    setShowPopup(true);
  };

  if (isLoading) {
    return (
      <div className={styles.layout}>
        <Header />
        <main className="container"><Loader /></main>
      </div>
    );
  }

  if (error || !users?.find(u => u.id === userId)) {
    return (
      <div className={styles.layout}>
        <Header />
        <main className="container">
          <div className={styles.error}>Пользователь не найден.</div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Header />
      <main className={`container ${styles.main}`}>
        <button onClick={() => navigate('/')} className={styles.backBtn} type="button">
          <ArrowLeft size={20} />
          <span>Назад</span>
        </button>

        <section className={styles.card}>
          <div className={styles.sidebar}>
            <div className={styles.avatar}>
              <img src={userAvatar} alt="User Avatar" />
            </div>
            <div className={styles.sidebarMenu}>
              <h3 className={styles.menuTitle}>Данные профиля</h3>
              <ul className={styles.menuList}>
                <li className={styles.active}>Рабочее пространство</li>
                <li>Приватность</li>
                <li>Безопасность</li>
              </ul>
            </div>
          </div>

          <div className={styles.formSection}>
            <h1 className={styles.title}>Данные профиля</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.grid}>
                <FormInput
                  label="Имя"
                  placeholder="Введите имя"
                  error={errors.name?.message}
                  {...register('name')}
                />
                
                <FormInput
                  label="Никнейм"
                  placeholder="Введите никнейм"
                  error={errors.username?.message}
                  {...register('username')}
                />
                
                <FormInput
                  label="Почта"
                  type="email"
                  placeholder="example@mail.com"
                  error={errors.email?.message}
                  {...register('email')}
                />
                
                <FormInput
                  label="Город"
                  placeholder="Введите город"
                  error={errors.city?.message}
                  {...register('city')}
                />
                
                <FormInput
                  label="Телефон"
                  placeholder="Введите номер телефона"
                  error={errors.phone?.message}
                  {...register('phone', {
                    onChange: (e) => {
                      // Оставляем только цифры при вводе
                      const val = e.target.value.replace(/\D/g, '');
                      e.target.value = val;
                      return val;
                    }
                  })}
                />
                
                <FormInput
                  label="Название компании"
                  placeholder="Введите название"
                  error={errors.companyName?.message}
                  {...register('companyName')}
                />
              </div>

              <div className={styles.actions}>
                <button 
                  type="submit" 
                  className={styles.saveBtn}
                  disabled={!isDirty}
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Popup
        isOpen={showPopup}
        message="Изменения успешно сохранены"
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
};
