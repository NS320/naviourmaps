from django.db import models

# Create your models here.

class Person(models.Model):      # 人物モデル
    class Meta:
        db_table = 'person'

    name = models.CharField(verbose_name='名前', max_length=255)
    age = models.IntegerField(verbose_name='年齢')

    def __str__(self):
        ret = str(self.name) + '(' + str(self.age) + '才)'
        return ret