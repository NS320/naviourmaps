from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


class MyUserManager(BaseUserManager):
    #ユーザーの新規作成
    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),  #電子メールの正規化
        )

        user.set_password(password)#上で作ったuserにパスワードの登録
        user.save(using=self._db)#データの追加または更新
        return user
    #管理者用ユーザーの新規作成
    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
            **extra_fields
        )
        user.is_admin = True    #管理者権限の有無
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True,)
    user_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=20, unique=False)
    biography = models.TextField(max_length=100, blank=True, null=True)
    is_logon = models.BooleanField(default=False)
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)#論理削除フラグ
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.user_id#子テーブルから見たときに参照されるカラム

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class Address(models.Model):
    address_id = models.AutoField(primary_key=True)
    address = models.CharField(max_length=50, unique = False)
    address_name = models.CharField(max_length=20, blank = True, null = True, unique = False)
    is_favorite = models.BooleanField(default=False)
    is_private = models.BooleanField(default=True)
    address_created_time = models.DateTimeField(auto_now_add=True)
    address_updated_time = models.DateTimeField(auto_now=True)
    #外部キーに関する設定, db_columnとto_fieldによって親の主キー以外を外部キーに設定できる
    myuser_foreign = models.ForeignKey(MyUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.address

class Navigations(models.Model):
    navigation_id = models.AutoField(primary_key=True)
    navigation_name = models.CharField(max_length=20, unique = False)
    start_address = models.CharField(max_length=65, unique = False)
    start_lat = models.FloatField(unique = False)
    start_lng = models.FloatField(unique = False)
    goal_address = models.CharField(max_length=65, unique = False)
    goal_lat = models.FloatField(unique = False)
    goal_lng = models.FloatField(unique = False)
    is_favorite = models.BooleanField(default=False)
    is_private = models.BooleanField(default=True)
    navigations_created_time = models.DateTimeField(auto_now_add=True)
    navigations_updated_time = models.DateTimeField(auto_now=True)
    #外部キーに関する設定, db_columnとto_fieldによって親の主キー以外を外部キーに設定できる
    myuser_foreign = models.ForeignKey(MyUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.navigation_name
