## facebook-app

> Testing facebook sign-in for a web app.


### Dependencies

- NodeJS
	- node version 12.16.3
	- npm version 6.14.4
- Windows OS 64 bit (optional)


## Usage

1. Clone this repository.  
`git clone https://github.com/weaponsforge/facebook-app.git`

2. Install dependencies.  
`npm install`

3. Run the local web server.  
`npm run start`

4. Launch the app on a web browser.  
`https://localhost:3000`  

	> **WARNING:** Loading https://localhost:3000 as ease will load the web app on an insecure ssl connection. Test signing in to FB at your own risk.  
	> 
	> If you want load the web app on a secure connection from localhost, follow the instructions discussed in the  section **Use Secure SSL Certificates on Localhost**. (for windows OS only instructions for other OS may vary)



### Use Secure SSL Certificates on Localhost

1. Launch **notepad** with Administrator access and open the `C:\Windows\System32\drivers\etc\hosts` file.
2. Append the following lines:  

		127.0.0.1 mywebsite.com
		127.0.0.1 localhost

3. Press **Search** from windows menu and search for **certmgr.msc**.
4. Under the **certmgr** window,
	- Go to **Certificates - Current User** -> **Trusted Root Certification Authority** -> **Certificates**
	- Right + Click the **Certificates** directory
	- Select **All tasks** -> **Import**
		- Browse for the **localhost-ssl.cer** file under `/server/helpers/localhost-ssl.cer`
		- Press the **Next** button.
		- Select the option `Place all certificates in the following store`
			- **Certificate store:** *Trusted Root Certification Authorities*
		- Press the **Next** button, then **Finish**
		- A **Security Warning** window will appear. Press the **Yes** button.

5. Close all instances of the Chrome browser, and re-open again. Load your localhost project: `https://localhost:3000`. This should now display a secure SSL connection.

6. After you are done testing, it is a good idea to revert all changes made on steps **#2** and **#4** to prevent security holes in your Windows system.

@weaponsforge  
20200609