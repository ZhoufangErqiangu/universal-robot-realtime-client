enum RobotMode {
  NoController = -1,
  Disconnected = 0,
  ConfirmSafty = 1,
  Booting = 2,
  PowerOff = 3,
  PowerOn = 4,
  Idle = 5,
  BackDrive = 6,
  Running = 7,
  UpdateingFirmware = 8,
}

enum JointMode {
  Reset = 235,
  ShuttingDown = 236,
  PartDCalibration = 237,
  BackDrive = 238,
  PowerOff = 239,
  ReadyForPowerOff = 240,
  NotResponding = 245,
  MotorInitalisation = 246,
  Booting = 247,
  PartDCalibrationError = 248,
  BootLoader = 249,
  Calibration = 250,
  Violation = 251,
  Fault = 252,
  Running = 253,
  Idle = 255,
}

enum SafetyMode {
  Normal = 1,
  Reduced = 2,
  ProtectiveStop = 3,
  Recovery = 4,
  SafeguardStop = 5, // (SI0 + SI1 + SBUS) Physical s-stop interface input
  SystemEmergencyStop = 6, // (EA + EB + SBUS->Screen) Physical e-stop interface input activated
  RobotEmergencyStop = 7, // (EA + EB + SBUS->Euromap67) Physical e-stop interface input activated
  Violation = 8,
  Fault = 9,
  ValidateJointId = 10,
  Undefined = 11,
}

export interface RealtimeInterface {
  MessageSize: number; // Total message length in bytes
  Time: number; // Time elapsed since the controller was started
  qTarget: Array<number>; // Target joint positions
  qdTarget: Array<number>; // Target joint velocities
  ITarget: Array<number>; // Target joint accelerations
  MTarget: Array<number>; // Target joint moments (torques)
  qActual: Array<number>; // Actual joint positions
  qdActual: Array<number>; // Actual joint velocities
  IActual: Array<number>; // Actual joint accelerations
  IControl: Array<number>; // Joint control currents
  ToolVectorActual: Array<number>; // Actual Cartesian coordinates of the tool: (x,y,z,rx,ry,rz), where rx, ry and rz is a rotation vector representation of the tool orientation
  TCPSpeedActual: Array<number>; // Actual speed of the tool given in Cartesian coordinates
  TCPForce: Array<number>; // Generalised forces in the TCP
  ToolVectorTarget: Array<number>; // Target Cartesian coordinates of the tool: (x,y,z,rx,ry,rz), where rx, ry and rz is a rotation vector representation of the tool orientation
  TCPSpeedTarget: Array<number>; // Target speed of the tool given in Cartesian coordinates
  DigtalInputBits: Array<boolean>; // Current state of the digital inputs. NOTE: these are bits encoded as int64_t, e.g. a value of 5 corresponds to bit 0 and bit 2 set high
  MotorTempatures: Array<number>; // Temperature of each joint in degrees celsius
  ControllerTimer: number; // Controller realtime thread execution time
  TestValue: number; // A value used by Universal Robots software only
  RobotMode: RobotMode;
  JointModes: JointMode;
  SafetyMode: SafetyMode;
  ToolAccelerometer: Array<number>; // Tool x,y and z accelerometer values (software version 1.7)
  SpeedScaling: number; // Speed scaling of the trajectory limiter
  LinearMomentumNorm: number; // Norm of Cartesian linear momentum
  VMain: number; // Masterboard: Main voltage
  VRobot: number; // Masterboard: Robot voltage (48V)
  IRobot: number; // Masterboard: Robot current
  VActual: number; // Actual joint voltages
  DigitalOutputs: Array<boolean>; // Digital outputs
  ProgramState: number; // Program state
  ElbowPosition: Array<number>; // Elbow position
  ElbowVelocity: Array<number>; // Elbow velocity
}
