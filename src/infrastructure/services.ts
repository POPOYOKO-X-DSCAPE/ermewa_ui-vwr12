import { createEnvironment } from "@packages/free";

const isDev = import.meta.env.DEV;
const baseUrl = isDev ? import.meta.env.VITE_API_HOST : window.location.origin;

const { createServices } = createEnvironment({
	credentials: {
		username: "mzeghdoudi",
		password: "Paris2024",
	},
	token: "",
});

const services = createServices(
	{
		dummy: {
			baseUrl,
			endpoints: {
				auth: {
					methods: ["GET"],
					path: "/api/dummy/v1/request?param=noparam",
					config: ({ credentials: { username, password } }) => {
						return {
							headers: {
								"Content-Type": "application/json",
								Authorization: `Basic ${btoa(`${username}:${password}`)}`,
							},
						};
					},
				},
			},
		},
		local: {
			baseUrl: import.meta.env.VITE_LOCAL_SERVICES_HOST,
			endpoints: {
				clipboard: {
					methods: ["POST"],
					path: "/CopyAndPaste/clipboard"
				}
			}
		},
		common: {
			baseUrl,
			endpoints: {
				sendMail: { /** documentCode : DC25000371 */
					methods: ["POST"],
					path: "/app/VWR12/XDO/DC25000371?request=XMAIL"
				}
			}
		},
		vwr: {
			baseUrl,
			endpoints: {
				parameters: {
					methods: ["GET"],
					path: "/app/VWR12/XDO?request=XPRM",
				},
				document: { /** documentCode : DC25000371 */
					methods: ["GET"],
					path: "/app/VWR12/XDO/:documentCode/?request=XDOC",
				},
				file: { /** documentCode : DC25000371 */
					methods: ["POST"],					
					responseType: 'blob',
					path: "/app/VWR12/XDO/:documentCode/?request=XFILE&EXT=:extension",
				},
			},
		},
	},
	{
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	},
);

export default services;
