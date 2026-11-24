function run(p,q){
const n=p.length,D=[],C=[],M=new Int32Array(256),O=new Uint8Array(65536);
let ol=0,ip=0,pc=0,st=0;
const E=c=>({o:O.slice(0,ol),e:c&255});
const ps=v=>D.push(v|0);
const pp=()=>D.pop();
const CK=(po,pu)=>D.length<po?2:D.length-po+pu>256?3:0;
const MA=a=>a<0||a>=256;
const BIN={16:(a,b)=>(a+b)|0,17:(a,b)=>(a-b)|0,18:(a,b)=>Math.imul(a,b),19:(a,b)=>a===-2147483648&&b===-1?a:Math.trunc(a/b)|0,20:(a,b)=>b===-1?0:(a%b)|0,21:(a,b)=>Math.floor((a>>>0)/(b>>>0))|0,22:(a,b)=>((a>>>0)%(b>>>0))|0,24:(a,b)=>a&b,25:(a,b)=>a|b,26:(a,b)=>a^b,28:(a,b)=>(a<<(b&31))|0,29:(a,b)=>a>>(b&31),30:(a,b)=>(a>>>(b&31))|0,32:(a,b)=>+(a===b),33:(a,b)=>+(a<b),34:(a,b)=>+((a>>>0)<(b>>>0))};
const V=[0x7fff00ff,0x1f0007,0xf0003];
for(;;){
if(st++>=1000000)return E(10);
if(pc<0||pc>=n)return E(9);
const op=p[pc];
if(!((V[op>>5]>>(op&31))&1))return E(5);
const il=op===1?1:op===2?4:op>=48&&op<=51?2:0;
if(pc+1+il>n)return E(9);
const nx=pc+1+il;pc=nx;
let c;
switch(op){
case 0:return E(0);
case 1:if((c=CK(0,1)))return E(c);{const b=p[nx-1];ps(b>=128?b-256:b);}break;
case 2:if((c=CK(0,1)))return E(c);ps(p[nx-4]|(p[nx-3]<<8)|(p[nx-2]<<16)|(p[nx-1]<<24));break;
case 3:if((c=CK(1,0)))return E(c);pp();break;
case 4:{if((c=CK(1,2)))return E(c);const a=pp();ps(a);ps(a);break;}
case 5:{if((c=CK(2,2)))return E(c);const b=pp(),a=pp();ps(b);ps(a);break;}
case 6:{if((c=CK(2,3)))return E(c);const b=pp(),a=pp();ps(a);ps(b);ps(a);break;}
case 7:{if((c=CK(3,3)))return E(c);const z=pp(),y=pp(),x=pp();ps(y);ps(z);ps(x);break;}
case 16:case 17:case 18:case 19:case 20:case 21:case 22:
case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
if((c=CK(2,1)))return E(c);
const b=pp(),a=pp();
if(op>=19&&op<=22&&b===0)return E(4);
ps(BIN[op](a,b));
break;
}
case 23:if((c=CK(1,1)))return E(c);ps(-pp()|0);break;
case 27:if((c=CK(1,1)))return E(c);ps(~pp());break;
case 48:case 49:case 50:{
const po=op===48?0:1;
if((c=CK(po,0)))return E(c);
let take=true;
if(op!==48){const v=pp();take=op===49?v===0:v!==0;}
if(take){const raw=p[nx-2]|(p[nx-1]<<8);pc=nx+((raw<<16)>>16);}
break;
}
case 51:if(C.length>=64)return E(7);C.push(nx);pc=p[nx-2]|(p[nx-1]<<8);break;
case 52:if(C.length===0)return E(8);pc=C.pop();break;
case 64:{if((c=CK(1,1)))return E(c);const addr=pp();if(MA(addr))return E(6);ps(M[addr]);break;}
case 65:{if((c=CK(2,0)))return E(c);const addr=pp(),v=pp();if(MA(addr))return E(6);M[addr]=v;break;}
case 80:{if((c=CK(1,0)))return E(c);const s=String(pp());if(ol+s.length>65536)return E(11);O.set(Buffer.from(s),ol);ol+=s.length;break;}
case 81:{if((c=CK(1,0)))return E(c);const v=pp();if(ol+1>65536)return E(11);O[ol++]=v&255;break;}
case 82:if((c=CK(0,1)))return E(c);ps(ip<q.length?q[ip++]:-1);break;
case 83:if((c=CK(1,0)))return E(c);return E(pp());
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input';
const OD=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
const {o,e}=run(readFileSync(`${I}/${id}/program.bin`),readFileSync(`${I}/${id}/input.bin`));
mkdirSync(`${OD}/${id}`,{recursive:true});
writeFileSync(`${OD}/${id}/stdout.bin`,o);
writeFileSync(`${OD}/${id}/exit.txt`,String(e));
}
