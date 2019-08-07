#!/usr/bin/env python  
# _#_ coding:utf-8 _*_
from utils.logger import logger
from dao.base import DataHandle
from doujiang_guofu.models import Family, EquipConfig
from django.shortcuts import get_object_or_404


class FamilyBase(DataHandle):
    def __init__(self):
        super(FamilyBase, self).__init__()

    def familyList(self):
        return Family.objects.all()

    def equipList(self):
        return EquipConfig.objects.all()

    def base(self):
        return {"userList": self.familyList(), "serviceList": self.equipList(),
                }

    def family(self, id):
        return get_object_or_404(Family, pk=id)

    def allowcator(self, sub, args, request=None):
        if hasattr(self, sub):
            func = getattr(self, sub)
            return func(args, request)
        else:
            logger.error(msg="FamilyBase没有{sub}方法".format(sub=sub))
            return []


FAMILY_BASE = FamilyBase()
