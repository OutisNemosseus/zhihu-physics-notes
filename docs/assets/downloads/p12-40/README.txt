12.40 LTspice 自动测量包（双精度与输出电阻命名修正版）

完整解压，在 LTspice 中打开 P12_40_Auto.asc，Run，然后 Ctrl+L。
所有 .asy 文件须与 .asc 保持在同一目录。P12_40_Auto.cir 可作为独立文字网表运行。

ID1_mA：静态漏电流，约0.41116 mA。
IC2_mA：PNP静态集电极电流大小，约0.81921 mA。
Av_V_per_V：电压增益，约0.88197。
Rof_ohm、Rout_loaded_ohm：含RL输出电阻，对应教材(c)，约141.636 Ω。
Rout_unloaded_ohm：不含RL的补充结果，约160.591 Ω。
以上为电路方程参考值；当前修正版尚待LTspice重跑确认。

P12_40_original_measurements.log 是用户提供的旧版真实日志摘录，不是当前修正版结果。旧日志的rof_ohm表示不含RL，命名含义已在新版更正。旧电阻读数有精度误差，不应当作最终答案。

新版设置numdgt=15保存双精度波形。电压扰动为±10uV，电流扰动为±10nA。RL始终保留。模型与比较详见comparison.txt。
