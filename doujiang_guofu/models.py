from django.db import models


class EquipConfig(models.Model):
    equid = models.CharField(max_length=10, primary_key=True, unique=True, verbose_name="装备ID")
    name = models.CharField(max_length=20, verbose_name="装备名称")
    qu = models.CharField(max_length=5, verbose_name="装备品级")

    class Meta:
        db_table = 'equip_config'
        permissions = (
            ("equip_read_equip_config", "读取装备信息表权限"),
            ("equip_change_equip_config", "更改装备信息表权限"),
            ("equip_add_equip_config", "添加装备信息表权限"),
            ("equip_delete_equip_config", "删除装备信息表权限"),
        )
        verbose_name = '装备管理'


class Family(models.Model):
    fid = models.IntegerField(primary_key=True, unique=True, verbose_name="家族ID")
    job = models.CharField(max_length=20, verbose_name="家族职位")

    class Meta:
        db_table = 'family_config'
        permissions = (
            ("family_read_family_config", "读取装备信息表权限"),
            ("family_change_family_config", "更改装备信息表权限"),
            ("family_add_family_config", "添加装备信息表权限"),
            ("family_delete_family_config", "删除装备信息表权限"),
        )
        verbose_name = '家族管理'
