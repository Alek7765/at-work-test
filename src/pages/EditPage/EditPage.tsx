import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery } from '@tanstack/react-query';
import avatarImgSrc from '@/assets/images/avatar-m.jpg'

import { fetchUsers } from '@/api/userApi';
import { useUserStore } from '@/store/useUserStore';
import { UserFormData } from '@/types/user';
import { FormInput } from '@/components/FormInput/FormInput';
import { Loader } from '@/components/Loader/Loader';
import { Popup } from '@/components/Popup/Popup';
import styles from './EditPage.module.scss';
import Button from "@/components/Button/Button.tsx";
import clsx from "clsx";
import SectionHeader from "@/components/SectionHeader/SectionHeader.tsx";

const phoneRegex = /^\d+$/;

const formSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа').max(64, 'Не более 64 символов'),
  username: z.string().min(2, 'Минимум 2 символа').max(64, 'Не более 64 символов'),
  email: z.string().email('Некорректный email'),
  city: z.string().min(2, 'Минимум 2 символа').max(64, 'Не более 64 символов'),
  phone: z.string().regex(phoneRegex, 'Только цифры').min(1, 'Обязательное поле'),
  companyName: z.string().min(2, 'Минимум 2 символа').max(64, 'Не более 64 символов'),
});

export default () => {
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
    reset,
    formState: { errors, isDirty }
  } = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (users && userId) {
      const u = users.find(u => u.id === userId);
      if (u) {
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
      }
    }
  }, [users, userId, updatedUsers, reset]);

  const onSubmit = (data: UserFormData) => {
    updateUser(userId, data);
    setShowPopup(true);
  };

  if (isLoading) {
    return <Loader />
  }

  if (error || !users?.find(u => u.id === userId)) {
    return (
      <div className="container">
        <div className={styles.error}>Пользователь не найден.</div>
      </div>
    )
  }

  return (
    <>
      <div className="container">
        <Button
          className={styles.buttonPrev}
          label="Назад"
          iconName="ArrowLeft"
          extraAttrs={{ onClick: () => navigate('/') }}
        />
        <section className={styles.profile}>
          <aside  className={styles.sidebar}>
            <img
              className={styles.profileImage}
              src={avatarImgSrc}
              alt=""
              width={280}
              height={425}
            />
            <ul className={styles.menuList}>
              <li className={clsx(styles.menuItem, styles.isActive)}>Данные профиля</li>
              <li className={styles.menuItem}>Рабочее пространство</li>
              <li className={styles.menuItem}>Приватность</li>
              <li className={styles.menuItem}>Безопасность</li>
            </ul>
          </aside >

          <div className={styles.profileData}>
            <SectionHeader title="Данные профиля" titleId="form"/>

            <form
              id="form"
              onSubmit={handleSubmit(onSubmit)}
              className={styles.form}
            >
              <FormInput
                label="Имя"
                id={`name-${userId}`}
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
                inputMode="numeric"
                label="Телефон"
                placeholder="Введите номер телефона"
                error={errors.phone?.message}
                {...register('phone', {
                  onChange: (e) => {
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

              <button
                type="submit"
                className={styles.buttonSave}
                disabled={!isDirty}
              >
                Сохранить
              </button>
            </form>
          </div>
        </section>
      </div>

      <Popup
        isOpen={showPopup}
        message="Изменения сохранены!"
        onClose={() => setShowPopup(false)}
      />
    </>
  );
};
