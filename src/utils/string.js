const generateIpfsUrl = (cidFilename) => {
  const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY;

  if (!IPFS_GATEWAY) {
    throw new Error("IPFS_GATEWAY is not defined");
  }

  const cid = cidFilename.split("/")[0];
  const cidFilenameExt = cidFilename.split("/")[1];

  return `https://${cid}.${IPFS_GATEWAY}/${cidFilenameExt}`;
};

export { generateIpfsUrl };
