window.config = {};
var restUrl_publish = ''
var restUrl_system = "{{config('app.url','')}}"   // /system/*
var restUrl_common = "{{config('current_publisher.base_url')}}"  // /common/*
var restUrl = "{{config('current_application.base_url', '/common')}}" // /*