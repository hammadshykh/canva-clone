declare module "three/examples/jsm/loaders/OBJLoader" {
 import { LoadingManager, Object3D, Material, Texture } from "three";
 import { Loader } from "three/src/loaders/Loader";

 export class OBJLoader extends Loader {
  constructor(manager?: LoadingManager);
  load(
   url: string,
   onLoad?: (obj: Object3D) => void,
   onProgress?: (event: ProgressEvent<EventTarget>) => void,
   onError?: (event: ErrorEvent) => void
  ): void;
  parse(text: string): Object3D;
 }
}
