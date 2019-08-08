#!/usr/bin/env python  
# _#_ coding:utf-8 _*_ 
import time
from celery import task
    

@task
def debug_task():
    print(time.time())
    return time.time()    
