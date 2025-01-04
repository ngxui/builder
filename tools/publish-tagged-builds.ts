import {
  execute,
  getPackages,
  getTagFromVersion,
  Package,
  printBoldTxt,
  printGreenTxt,
  printRedTxt,
  printYellowTxt
} from './utils';
import {exec} from "child_process";

function canPublishVersion(pack: Package): Promise<boolean> {
    const packageName = pack.packageName;
    const version = pack.version;
    return new Promise((resolve) => {
        exec(`npm view ${packageName}@${version}`, (error) => {
            resolve(error !== null);
        });
    });
}

export async function publishAllPackagesToNpm() {
    const packages = getPackages();
    for (const pack of packages) {
        try {
            await publishPackage(pack);
        } catch (error) {
            // One retry
            await publishPackage(pack);
        }
    }
}

async function publishPackage(pack: Package) {
    const canPublish = await canPublishVersion(pack);
    if (canPublish) {
        const tag = getTagFromVersion(pack.version);
        const packageDescription = `${pack.buildPath} ${pack.version} @${tag}`;
        try {
            const script = `npm publish  ${pack.buildPath} --access public --tag ${tag}`;
            const output = await execute(script, {cwd: pack.buildPath});
            printGreenTxt(`Published ${packageDescription} /r/n -> ${output}`);
        } catch (error) {
          printRedTxt(`Error Publishing ${packageDescription} /r/n -> ${error}`);
            throw error;
        }

    } else {
      printYellowTxt(`Skip: ${pack.packageName} Version ${pack.version} already exists`);
    }
}

async function main() {
     printBoldTxt('############### publishing new VERSION ###############');
    await publishAllPackagesToNpm();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
