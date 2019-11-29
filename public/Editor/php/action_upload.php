<?php
/**
 * 上传附件和上传视频
 * User: Jinqn
 * Date: 14-04-09
 * Time: 上午10:17
 */
require_once '../../../inc/auto.inc.php';

//判断是否登陆
$AdminUser			= new kernal_user();
$item               = new SphomeItem();
$AdminLoginUserID	= $AdminUser->LoginUserId();

if( empty($AdminLoginUserID) ){
	$Json	 = array(
    		"state" => false,
            "url" => '',
            "title" => '',
            "original" => '',
            "type" => '',
            "size" => ''
			);
	echo json_encode($Json);
	exit;
}

include "Uploader.class.php";

/* 上传配置 */
$base64 = "upload";
switch (htmlspecialchars($_GET['action'])) {
    case 'uploadimage':
        $config = array(
            "pathFormat" => $CONFIG['imagePathFormat'],
            "maxSize" => $CONFIG['imageMaxSize'],
            "allowFiles" => $CONFIG['imageAllowFiles']
        );
        $fieldName = $CONFIG['imageFieldName'];
        break;
    case 'uploadscrawl':
        $config = array(
            "pathFormat" => $CONFIG['scrawlPathFormat'],
            "maxSize" => $CONFIG['scrawlMaxSize'],
            "allowFiles" => $CONFIG['scrawlAllowFiles'],
            "oriName" => "scrawl.png"
        );
        $fieldName = $CONFIG['scrawlFieldName'];
        $base64 = "base64";
        break;
    case 'uploadvideo':
        $config = array(
            "pathFormat" => $CONFIG['videoPathFormat'],
            "maxSize" => $CONFIG['videoMaxSize'],
            "allowFiles" => $CONFIG['videoAllowFiles']
        );
        $fieldName = $CONFIG['videoFieldName'];
        break;
        
    case 'uploadfile':
    default:
        $config = array(
            "pathFormat" 	=> $CONFIG['filePathFormat'],
            "maxSize" 		=> $CONFIG['fileMaxSize'],
            "allowFiles" 	=> $CONFIG['fileAllowFiles']
        );
        $fieldName 			= $CONFIG['fileFieldName'];
        break;
}

/* 生成上传实例对象并完成上传 */
$up = new Uploader($fieldName, $config, $base64);

/**
 * 得到上传文件所对应的各个参数,数组结构
 * array(
 *     "state" => "",          //上传状态，上传成功时必须返回"SUCCESS"
 *     "url" => "",            //返回的地址
 *     "title" => "",          //新文件名
 *     "original" => "",       //原始文件名
 *     "type" => ""            //文件类型
 *     "size" => "",           //文件大小
 * )
 */
 
$Return		= $up->getFileInfo();

//获取
if( htmlspecialchars($_GET['action'])=="uploadfile" && $Return['state']=="SUCCESS" ){
	$Dom	= new SphomeDocument();
	
	$Arr					= array();
	$Arr['doc_user_id']		= $AdminLoginUserID;
	$Arr['doc_name']		= $Return['original'];
	$Arr['doc_type']		= $Return['type'];
	$Arr['doc_upload_time']	= date("Y-m-d H:i:s");
	$Arr['doc_path']		= $Return['url'];
	
	$Dom->document_modify($Arr);
	
}



/* 返回数据 */
return json_encode( $Return );
