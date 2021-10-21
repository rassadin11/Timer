# -*- mode: python ; coding: utf-8 -*-


block_cipher = None


a = Analysis(['index.py'],
             pathex=['C:\\web\\2021\\Projects\\js'],
             binaries=[],
             datas=[('C:\\Users\\artem\\AppData\\Local\\Programs\\Python\\Python39\\lib\\site-packages\\eel\\eel.js', 'eel'), ('front', 'front')],
             hiddenimports=['bottle_websocket', 'plyer.platforms.win.notification'],
             hookspath=[],
             hooksconfig={},
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,  
          [],
          name='index',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=True,
          disable_windowed_traceback=False,
          target_arch=None,
          codesign_identity=None,
          entitlements_file=None , icon='timer.ico')
