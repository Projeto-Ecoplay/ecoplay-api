const jwt = require('jsonwebtoken');
const { authenticate } = require('../../../middleware/authenticate');
const { emitirToken } = require('../../../lib/jwt');
const { mockReq, mockRes, mockNext } = require('../../mocks/reqRes');

describe('middleware/authenticate', () => {
  it('permite acesso com token valido', () => {
    const token = emitirToken({ sub: '10', email: 'user@exemplo.com' });
    const req = mockReq({ headers: { authorization: `Bearer ${token}` } });
    const res = mockRes();
    const next = mockNext();

    authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ id: 10, email: 'user@exemplo.com' });
  });

  it('bloqueia quando nao ha token', () => {
    const req = mockReq();
    const res = mockRes();
    const next = mockNext();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringContaining('Token') })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('bloqueia token expirado', () => {
    const token = jwt.sign({ sub: '1', email: 'user@exemplo.com' }, process.env.JWT_SECRET, {
      issuer: 'ecoplay-api',
      expiresIn: '-10s',
    });
    const req = mockReq({ headers: { authorization: `Bearer ${token}` } });
    const res = mockRes();
    const next = mockNext();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringContaining('Token') })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('bloqueia token invalido', () => {
    const req = mockReq({ headers: { authorization: 'Bearer invalido' } });
    const res = mockRes();
    const next = mockNext();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringContaining('Token') })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
