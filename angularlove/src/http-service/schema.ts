export interface HttpServiceOptions {
  /* The name of the service. */
  name: string;
  /* The path to create the service. */
  path?: string;
  /* The name of the project. */
  project?: string;
  /* Flag to indicate if a directory for file should be created. */
  flat?: boolean;
  /* Http methods to generate. */
  methods?: string;
}
