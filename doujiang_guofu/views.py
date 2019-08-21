#!/usr/bin/env python  
# _#_ coding:utf-8 _*_
from django.views.generic import View
from django.shortcuts import render
from dao.dj_guofu_game import FamilyBase
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import permission_required
from utils.base import method_decorator_adaptor


class Config(LoginRequiredMixin, View):
    login_url = '/login/'

    def get(self, request, *args, **kwagrs):
        return render(request, 'dj_guofu/family_list.html', {"user": request.user})


class FamilyList(LoginRequiredMixin, FamilyBase, View):
    login_url = '/login/'

    @method_decorator_adaptor(permission_required, "doujiang_guofu.family_read_family_config", "/403/")
    def get(self, request, *args, **kwagrs):
        return render(request, 'dj_guofu/family_list.html',
                      {"user": request.user, "family": self.base(), "familyList": self.familyList()})
