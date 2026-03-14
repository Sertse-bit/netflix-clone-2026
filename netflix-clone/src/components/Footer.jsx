function Footer() {
  return (
    <footer className="bg-black text-gray-400 px-10 py-10">
      
      {/* Link grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold mb-2">Company</h3>
          <a href="#">About</a>
          <a href="#">Jobs</a>
          <a href="#">Press</a>
          <a href="#">Blog</a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold mb-2">Support</h3>
          <a href="#">Help Center</a>
          <a href="#">Safety Center</a>
          <a href="#">Community Guidelines</a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold mb-2">Legal</h3>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy</a>
          <a href="#">Cookie Preferences</a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold mb-2">Account</h3>
          <a href="#">Manage Account</a>
          <a href="#">Redeem Gift Cards</a>
          <a href="#">Purchase History</a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold mb-2">Connect</h3>
          <a href="#">Contact Us</a>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold mb-2">More</h3>
          <a href="#">Media Center</a>
          <a href="#">Buy Gift Cards</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>

      {/* Language selector + legal */}
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <select className="bg-black border border-gray-600 text-gray-400 p-2 rounded mb-4 md:mb-0">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>Amharic</option>
        </select>
        <p>© 2026 NETFLIX, Inc.</p>
      </div>

    </footer>
  );
}

export default Footer;
