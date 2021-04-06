import { KernelSpec } from '@jupyterlab/services';

import { IKernel, IKernelSpecs } from './tokens';

/**
 * A class to handle requests to /api/kernelspecs
 */
export class KernelSpecs implements IKernelSpecs {
  /**
   * Construct a new KernelSpecs.
   *
   * @param options The instantiation options.
   */
  constructor(options: KernelSpecs.IOptions) {
    // no-op
  }

  /**
   * Get the kernel specs.
   */
  get specs(): KernelSpec.ISpecModels | null {
    if (this._specs.size === 0) {
      return null;
    }
    return {
      default: 'javascript',
      kernelspecs: Object.fromEntries(this._specs)
    };
  }

  /**
   * Get the kernel factories for the current kernels.
   */
  get factories(): KernelSpecs.KernelFactories {
    return this._factories;
  }

  /**
   * Register a new kernel.
   *
   * @param options The options to register a new kernel.
   */
  register(options: KernelSpecs.IKernelOptions): void {
    const { spec, create } = options;
    this._specs.set(spec.name, spec);
    this._factories.set(spec.name, create);
  }

  private _specs = new Map<string, KernelSpec.ISpecModel>();
  private _factories = new Map<string, KernelSpecs.KernelFactory>();
}

/**
 * A namespace for KernelSpecs statics.
 */
export namespace KernelSpecs {
  /**
   * The instantiation options for a KernelSpecs
   */
  export interface IOptions {}

  /**
   * Registration options for a new kernel.
   */
  export interface IKernelOptions {
    /**
     * The kernel spec.
     */
    spec: KernelSpec.ISpecModel;

    /**
     * The factory function to instantiate a new kernel.
     */
    create: KernelFactory;
  }

  /**
   * The type for a kernel factory function used to instantiate new kernels.
   */
  export type KernelFactory = (options: IKernel.IOptions) => Promise<IKernel>;

  /**
   * The type for the record of kernel factory functions.
   */
  export type KernelFactories = Map<string, KernelFactory>;
}
