from django.db import models


class EquipConfig(models.Model):
    equid = models.CharField(max_length=10, primary_key=True, unique=True, verbose_name="装备ID")
    name = models.CharField(max_length=20, verbose_name="装备名称")
    qu = models.CharField(max_length=5, verbose_name="装备品级")

    class Meta:
        db_table = 'equip_config'
        permissions = (
            ("doujiang_guofu_read_equip_config", "读取装备信息表权限"),
            ("doujiang_guofu_change_equip_config", "更改装备信息表权限"),
            ("doujiang_guofu_add_equip_config", "添加装备信息表权限"),
            ("doujiang_guofu_delete_equip_config", "删除装备信息表权限"),
        )
        verbose_name = '装备管理'


class Family(models.Model):
    fid = models.IntegerField(primary_key=True, unique=True, verbose_name="家族ID")
    job = models.CharField(max_length=20, verbose_name="家族职位")

    class Meta:
        db_table = 'family_config'
        permissions = (
            ("doujiang_guofu_read_family", "读取家族信息表权限"),
            ("doujiang_guofu_change_family", "更改家族信息表权限"),
            ("doujiang_guofu_add_family", "添加家族信息表权限"),
            ("doujiang_guofu_delete_family", "删除家族信息表权限"),
        )
        verbose_name = '家族管理'
