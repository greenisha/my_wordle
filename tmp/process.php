<?php
$out = [];
$data = file('russian_nouns.txt');
$res = array_filter($data,function($word){
    // var_dump($word);    
    return (strlen(trim($word))==10);
});

$res_trimmed = array_values(array_map(function($word){return trim(str_replace('ё', 'е', $word));},$res));
shuffle($res_trimmed);
$out['letter_5']= array_slice($res_trimmed,0,200);

$res = array_filter($data,function($word){
    // var_dump($word);    
    return (strlen(trim($word))==12);
});

$res_trimmed = array_values(array_map(function($word){return trim(str_replace('ё', 'е', $word));},$res));
shuffle($res_trimmed);
$out['letter_6']= array_slice($res_trimmed,0,200);

$res = array_filter($data,function($word){
    // var_dump($word);    
    return (strlen(trim($word))==14);
});

$res_trimmed = array_values(array_map(function($word){return trim(str_replace('ё', 'е', $word));},$res));
shuffle($res_trimmed);
$out['letter_7']= array_slice($res_trimmed,0,200);


file_put_contents ('wordsGuess.json',json_encode($out,JSON_UNESCAPED_UNICODE));