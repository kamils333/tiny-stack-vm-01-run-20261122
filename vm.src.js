// The code main.ts's packed eval() runs (brotli-compressed there to stay under the 8,192-byte cap).
function run(p, q) {
  const n = p.length, D = [], C = [], M = new Int32Array(256), O = new Uint8Array(65536);
  let ol = 0, ip = 0, pc = 0, st = 0;
  const E = c => ({ o: O.slice(0, ol), e: c & 255 });
  const ps = v => D.push(v | 0);
  const pp = () => D.pop();
  const CK = (po, pu) => (D.length < po ? 2 : D.length - po + pu > 256 ? 3 : 0);
  const MA = a => a < 0 || a >= 256;
  for (;;) {
    if (st++ >= 1000000) return E(10);
    if (pc < 0 || pc >= n) return E(9);
    const op = p[pc];
    if (!((op >= 0 && op <= 7) || (op >= 16 && op <= 30) || (op >= 32 && op <= 34) || (op >= 48 && op <= 52) || (op >= 64 && op <= 65) || (op >= 80 && op <= 83))) return E(5);
    const il = op === 1 ? 1 : op === 2 ? 4 : op >= 48 && op <= 51 ? 2 : 0;
    if (pc + 1 + il > n) return E(9);
    const nx = pc + 1 + il;
    let jp = false, c;
    switch (op) {
      case 0: return E(0);
      case 1: if ((c = CK(0, 1))) return E(c); { const b = p[pc + 1]; ps(b >= 128 ? b - 256 : b); } break;
      case 2: if ((c = CK(0, 1))) return E(c); ps(p[pc + 1] | (p[pc + 2] << 8) | (p[pc + 3] << 16) | (p[pc + 4] << 24)); break;
      case 3: if ((c = CK(1, 0))) return E(c); pp(); break;
      case 4: { if ((c = CK(1, 2))) return E(c); const a = pp(); ps(a); ps(a); break; }
      case 5: { if ((c = CK(2, 2))) return E(c); const b = pp(), a = pp(); ps(b); ps(a); break; }
      case 6: { if ((c = CK(2, 3))) return E(c); const b = pp(), a = pp(); ps(a); ps(b); ps(a); break; }
      case 7: { if ((c = CK(3, 3))) return E(c); const z = pp(), y = pp(), x = pp(); ps(y); ps(z); ps(x); break; }
      case 16: case 17: case 18: case 19: case 20: case 21: case 22:
      case 24: case 25: case 26: case 28: case 29: case 30:
      case 32: case 33: case 34: {
        if ((c = CK(2, 1))) return E(c);
        const b = pp(), a = pp();
        let r;
        if (op === 16) r = (a + b) | 0;
        else if (op === 17) r = (a - b) | 0;
        else if (op === 18) r = Math.imul(a, b);
        else if (op === 19) { if (b === 0) return E(4); r = a === -2147483648 && b === -1 ? a : Math.trunc(a / b) | 0; }
        else if (op === 20) { if (b === 0) return E(4); r = b === -1 ? 0 : (a % b) | 0; }
        else if (op === 21) { if (b === 0) return E(4); r = Math.floor((a >>> 0) / (b >>> 0)) | 0; }
        else if (op === 22) { if (b === 0) return E(4); r = ((a >>> 0) % (b >>> 0)) | 0; }
        else if (op === 24) r = a & b;
        else if (op === 25) r = a | b;
        else if (op === 26) r = a ^ b;
        else if (op === 28) r = (a << (b & 31)) | 0;
        else if (op === 29) r = a >> (b & 31);
        else if (op === 30) r = (a >>> (b & 31)) | 0;
        else if (op === 32) r = a === b ? 1 : 0;
        else if (op === 33) r = a < b ? 1 : 0;
        else r = (a >>> 0) < (b >>> 0) ? 1 : 0;
        ps(r);
        break;
      }
      case 23: if ((c = CK(1, 1))) return E(c); ps(-pp() | 0); break;
      case 27: if ((c = CK(1, 1))) return E(c); ps(~pp()); break;
      case 48: case 49: case 50: {
        const po = op === 48 ? 0 : 1;
        if ((c = CK(po, 0))) return E(c);
        let take = true;
        if (op !== 48) { const v = pp(); take = op === 49 ? v === 0 : v !== 0; }
        if (take) { const raw = p[pc + 1] | (p[pc + 2] << 8); pc = nx + ((raw << 16) >> 16); jp = true; }
        break;
      }
      case 51: if (C.length >= 64) return E(7); C.push(nx); pc = p[pc + 1] | (p[pc + 2] << 8); jp = true; break;
      case 52: if (C.length === 0) return E(8); pc = C.pop(); jp = true; break;
      case 64: { if ((c = CK(1, 1))) return E(c); const addr = pp(); if (MA(addr)) return E(6); ps(M[addr]); break; }
      case 65: { if ((c = CK(2, 0))) return E(c); const addr = pp(), v = pp(); if (MA(addr)) return E(6); M[addr] = v; break; }
      case 80: { if ((c = CK(1, 0))) return E(c); const s = String(pp()); if (ol + s.length > 65536) return E(11); O.set(Buffer.from(s), ol); ol += s.length; break; }
      case 81: { if ((c = CK(1, 0))) return E(c); const v = pp(); if (ol + 1 > 65536) return E(11); O[ol++] = v & 255; break; }
      case 82: if ((c = CK(0, 1))) return E(c); ps(ip < q.length ? q[ip++] : -1); break;
      case 83: if ((c = CK(1, 0))) return E(c); return E(pp());
    }
    if (!jp) pc = nx;
  }
}
const I = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OD = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
for (const id of readdirSync(I).sort()) {
  const { o, e } = run(readFileSync(`${I}/${id}/program.bin`), readFileSync(`${I}/${id}/input.bin`));
  mkdirSync(`${OD}/${id}`, { recursive: true });
  writeFileSync(`${OD}/${id}/stdout.bin`, o);
  writeFileSync(`${OD}/${id}/exit.txt`, String(e));
}
