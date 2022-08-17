import { f64, ns64, nu64, seq, struct, u32 } from "@solana/buffer-layout";
import { JointMode } from "./JointMode";
import { RobotMode } from "./RobotMode";
import { SafetyMode } from "./SafetyMode";

export interface RealtimeInterface {
  MessageSize: number; // Total message length in bytes
  Time: number; // Time elapsed since the controller was started
  qTarget: Array<number>; // Target joint positions
  qdTarget: Array<number>; // Target joint velocities
  qddTarget: Array<number>; // Target joint accelerations
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
  DigtalInputBits: number; // Current state of the digital inputs. NOTE: these are bits encoded as int64_t, e.g. a value of 5 corresponds to bit 0 and bit 2 set high
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
  VActual: Array<number>; // Actual joint voltages
  DigitalOutputs: number; // Digital outputs
  ProgramState: number; // Program state
  ElbowPosition: Array<number>; // Elbow position
  ElbowVelocity: Array<number>; // Elbow velocity
}

export const RealtimeInterfaceLayout = struct<RealtimeInterface>([
  u32("MessageSize"),
  f64("Time"),
  seq(f64(), 6, "qTarget"),
  seq(f64(), 6, "qdTarget"),
  seq(f64(), 6, "qddTarget"),
  seq(f64(), 6, "ITarget"),
  seq(f64(), 6, "MTarget"),
  seq(f64(), 6, "qActual"),
  seq(f64(), 6, "qActual"),
  seq(f64(), 6, "IActual"),
  seq(f64(), 6, "IControl"),
  seq(f64(), 6, "ToolVectorActual"),
  seq(f64(), 6, "TCPSpeedActual"),
  seq(f64(), 6, "TCPForce"),
  seq(f64(), 6, "ToolVectorTarget"),
  seq(f64(), 6, "TCPSpeedTarget"),
  ns64("DigtalInputBits"),
  seq(f64(), 6, "MotorTempatures"),
  f64("ControllerTimer"),
  nu64("TestValue"),
  ns64("RobotMode"),
  seq(ns64(), 6, "JointModes"),
  ns64("SafetyMode"),
  seq(nu64(), 6),
  seq(f64(), 3, "ToolAccelerometer"),
  seq(nu64(), 6),
  f64("SpeedScaling"),
  f64("LinearMomentumNorm"),
  nu64(),
  nu64(),
  f64("VMain"),
  f64("VRobot"),
  f64("IRobot"),
  seq(f64(), 6, "VActual"),
  nu64("DigitalOutputs"),
  ns64("ProgramState"),
  seq(f64(), 3, "ElbowPosition"),
  seq(f64(), 3, "ElbowVelocity"),
]);
