exports.encrypt=function(s)
{
    var res='';
    for(var i=0;i<s.length;i++)
    {
        if(s[i]>='a' && s[i]<='z')
        {
            var d=s.charCodeAt(i)-97;
            d=(d+13);
            if(d>=26)
                d-=26;
            var convert=String.fromCharCode(d+97);
            res+=convert;
        }
        else if(s[i]>='A' && s[i]<='Z')
        {
            var d=s.charCodeAt(i)-65;
            d=(d+13);
            if(d>=26)
                d-=26;
            var convert=String.fromCharCode(d+65);
            res+=convert;
        }
        else
        {
            res+=s[i];
        }

    }
    return res;
};
exports.decrypt=function(s)
{
    return encrypt(s);
};