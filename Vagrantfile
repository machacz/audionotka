Vagrant.configure("2") do |config|

  config.vm.define "notka" do |notka|
    notka.vm.box = "amoshydra/node6"
    notka.vm.box_version = "0.0.1"
    notka.vm.network :private_network, ip: "10.1.1.14"
    notka.vm.synced_folder ".", "/home/vagrant", type: "nfs", create: true
    notka.vm.provision :shell, path: "provision/provision.sh"
  end

end
