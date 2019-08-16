#!/usr/bin/env python  
# _#_ coding:utf-8 _*_
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api import serializers
from doujiang_guofu.models import *


@api_view(['GET', 'POST'])
def family_list(request, format=None):
    if request.method == 'GET':
        snippets = Family.objects.all()
        serializer = serializers.FamilySerializer(snippets, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        if not request.user.has_perm('doujiang_guofu.doujiang_guofu_add_family'):
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = serializers.FamilySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def family_detail(request, id, format=None):
    try:
        snippet = Family.objects.get(fid=id)
    except Family.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = serializers.FamilySerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        if not request.user.has_perm('doujiang_guofu.assets_change_project_assets'):
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = serializers.FamilySerializer(snippet, data=request.data)
        # old_name = snippet.project_name
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if not request.user.has_perm('asset.assets_delete_project_Assets'):
            return Response(status=status.HTTP_403_FORBIDDEN)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
